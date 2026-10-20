#!/usr/bin/env python3
"""
Bake GitHub languages into the data/*.json files.

Reads every project's `source_code` GitHub link, asks the GitHub API for the
repo's language breakdown and writes a `languages` array into the project
(languages under 5% of the repo are ignored). The website then uses these
values directly and never has to call GitHub from the visitor's browser.

Usage (from the repo root):
    python3 scripts/update_languages.py            # anonymous: 60 requests/hour
    GITHUB_TOKEN=ghp_xxx python3 scripts/update_languages.py   # 5000/hour

Projects without a GitHub link are left untouched. Re-run whenever you add
projects or want to refresh the numbers.
"""
import glob, json, os, re, sys, urllib.error, urllib.request

MIN_SHARE = 0.05
REPO_RE = re.compile(r'^https?://(?:www\.)?github\.com/([^/\s#?]+)/([^/\s#?]+)', re.I)


def fetch_languages(owner, name):
    req = urllib.request.Request(
        f'https://api.github.com/repos/{owner}/{name}/languages',
        headers={'Accept': 'application/vnd.github+json', 'User-Agent': 'portfolio-language-sync'})
    token = os.environ.get('GITHUB_TOKEN')
    if token:
        req.add_header('Authorization', f'Bearer {token}')
    with urllib.request.urlopen(req, timeout=20) as res:
        return json.load(res)


def top_languages(byte_counts):
    total = sum(byte_counts.values())
    if not total:
        return []
    ranked = sorted(byte_counts.items(), key=lambda kv: kv[1], reverse=True)
    return [k for i, (k, v) in enumerate(ranked) if i == 0 or v / total >= MIN_SHARE][:5]


def main():
    changed = 0
    for path in sorted(glob.glob('data/*/*.json')):
        if path.endswith('manifest.json'):
            continue
        with open(path, encoding='utf-8') as f:
            data = json.load(f)
        dirty = False
        for project in data.get('projects', []):
            m = REPO_RE.match(project.get('source_code') or '')
            if not m:
                continue
            owner, name = m.group(1), re.sub(r'\.git$', '', m.group(2))
            try:
                langs = top_languages(fetch_languages(owner, name))
            except urllib.error.HTTPError as e:
                print(f'  ! {owner}/{name}: HTTP {e.code}', file=sys.stderr)
                if e.code in (403, 429):
                    print('Rate limited — set GITHUB_TOKEN and retry.', file=sys.stderr)
                    sys.exit(1)
                continue
            if langs and project.get('languages') != langs:
                project['languages'] = langs
                dirty = True
                changed += 1
                print(f'  {owner}/{name}: {", ".join(langs)}')
        if dirty:
            with open(path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
                f.write('\n')
    print(f'Done — updated {changed} project(s).')


if __name__ == '__main__':
    main()
