#!/usr/bin/env python3

"""Read jacoco coverage index.html and print out the coverage result."""

import argparse
import colorama
from bs4 import BeautifulSoup
from tabulate import tabulate
colorama.init(autoreset=True)

COVERAGE_INDEX_MAP = {
    "complexity": [5, 6],
    "line": [7, 8],
    "method": [9, 10],
    "class": [11, 12]
}


def run(file: str) -> None:
    """Run the logic of this script."""
    with open(file, 'r') as jacoco_file:
        jacoco_string = jacoco_file.read()
    parser = BeautifulSoup(jacoco_string, 'html.parser')
    complexity_coverage_info = fetch_coverage_info(parser, "complexity")
    line_coverage_info = fetch_coverage_info(parser, "line")
    method_coverage_info = fetch_coverage_info(parser, "method")
    class_coverage_info = fetch_coverage_info(parser, "class")

    tabulate_print = tabulate([complexity_coverage_info, line_coverage_info,
                               method_coverage_info, class_coverage_info],
                              headers=["Coverage Type", "Missed", "Total", "Percentage"])
    print(colorama.Fore.GREEN + tabulate_print)


def fetch_coverage_info(parser: callable, coverage_type: str) -> list:
    """Extract coverage information from BeautifulSoup parser."""
    if coverage_type not in COVERAGE_INDEX_MAP.keys():
        raise ValueError("Coverage type must be either complexity, line, method, or class")
    missed = float(list(parser.tfoot.tr.children)[COVERAGE_INDEX_MAP[coverage_type][0]].string)
    total = float(list(parser.tfoot.tr.children)[COVERAGE_INDEX_MAP[coverage_type][1]].string)
    coverage = round((total - missed) / total * 100, 2)
    return [coverage_type, str(missed), str(total), str(coverage)]


def main():
    """Parse arguments."""
    parser = argparse.ArgumentParser()
    parser.add_argument('file',
                        help='Provide file path for jacoco\'s index.html')
    args = parser.parse_args()
    run(args.file)


if __name__ == '__main__':
    main()
