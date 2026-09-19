#!/usr/bin/env python3
"""Обновляет BUILD_TIME / BUILD_VERSION / BUILD_NUMBER в worker.js перед коммитом.

Запуск:  python scripts/bake_build_info.py [--version 1.2.0]

Номер сборки = число коммитов в git + 1 (т.е. номер того коммита, который сейчас создаётся).
"""
import argparse
import datetime
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
WORKER = ROOT / "worker.js"


def git(*args: str) -> str:
    return subprocess.run(["git", *args], cwd=ROOT, capture_output=True, text=True,
                          check=True).stdout.strip()


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--version", help="явная версия, напр. 1.2.0 (иначе оставить текущую)")
    args = ap.parse_args()

    # номер коммита, который будет создан этим пушем
    build_number = int(git("rev-list", "--count", "HEAD")) + 1
    build_time = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    if not WORKER.exists():
        print(f"worker.js не найден: {WORKER}", file=sys.stderr)
        return 1
    src = WORKER.read_text(encoding="utf-8")

    version = args.version or re.search(r'BUILD_VERSION = "([^"]*)"', src).group(1)

    new = re.sub(r'BUILD_TIME = "[^"]*"', f'BUILD_TIME = "{build_time}"', src)
    new = re.sub(r'BUILD_VERSION = "[^"]*"', f'BUILD_VERSION = "{version}"', new)
    new = re.sub(r'BUILD_NUMBER = \d+', f'BUILD_NUMBER = {build_number}', new)

    if new != src:
        WORKER.write_text(new, encoding="utf-8")
    print(f"build {build_time} · v{version} · #{build_number}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
