#!/usr/bin/env python3

"""Create Google KMS Keyring and Key in Google Cloud."""

import argparse
import subprocess
import colorama
colorama.init(autoreset=True)


def build(branch: str, force: bool) -> None:
    """Build backend project and git push."""
    print(colorama.Fore.YELLOW +
          'Building Backend Project')
    cmd = 'mvn clean install'
    print(colorama.Fore.YELLOW + 'Running cmd: ' + cmd)
    try:
        subprocess.check_call(cmd.split())
        print(colorama.Fore.GREEN + 'Build success')
        try:
            git_cmd = 'git push origin ' + branch
            if force:
                git_cmd += ' -f'
            print(colorama.Fore.YELLOW + 'Now running cmd: ' + git_cmd)
            subprocess.check_call(git_cmd.split())
            print(colorama.Fore.GREEN + 'git push success')
        except subprocess.CalledProcessError:
            print(colorama.Fore.RED + 'Failed to git push')
    except subprocess.CalledProcessError:
        print(colorama.Fore.RED + 'Failed to build')


def main():
    """Parse arguments."""
    parser = argparse.ArgumentParser()
    parser.add_argument('branch',
                        help='Name of the branch you are pushing to')
    parser.add_argument('--force', '-f', default=False,
                        help='force push')
    args = parser.parse_args()
    build(args.branch, args.force)


if __name__ == '__main__':
    main()
