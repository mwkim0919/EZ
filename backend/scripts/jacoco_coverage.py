#!/usr/bin/env python3

"""Read jacoco coverage index.html and pom.xml file and then print out the coverage result."""

import argparse
import colorama
from bs4 import BeautifulSoup
from tabulate import tabulate

import pom_xml_parser

colorama.init(autoreset=True)

COVERAGE_INDEX_MAP = {
    "complexity": [5, 6],
    "line": [7, 8],
    "method": [9, 10],
    "class": [11, 12]
}

COVERAGE_MAP = {
    "complexity": [],
    "line": [],
    "method": [],
    "class": []
}


def run(pom_file: str, jacoco_file: str) -> None:
    """Run the logic of this script."""
    with open(jacoco_file, 'r') as jacoco_file:
        jacoco_string = jacoco_file.read()
    parser = BeautifulSoup(jacoco_string, 'html.parser')

    complexity_coverage_info = fetch_coverage_info(parser, "complexity")
    line_coverage_info = fetch_coverage_info(parser, "line")
    method_coverage_info = fetch_coverage_info(parser, "method")
    class_coverage_info = fetch_coverage_info(parser, "class")
    coverage_info_array = [complexity_coverage_info, line_coverage_info,
                           method_coverage_info, class_coverage_info]
    map_coverage_info(coverage_info_array)

    tabulate_print = tabulate(coverage_info_array,
                              headers=["Coverage Type", "Missed", "Total", "Percentage"])
    print(colorama.Fore.GREEN + tabulate_print)

    coverage_type, min_coverage = pom_xml_parser.run(pom_file)

    coverage_greater_than_min, actual_coverage = is_coverage_greater_than_min(coverage_type, float(min_coverage))
    if not coverage_greater_than_min:
        raise AssertionError(colorama.Fore.RED + "Current coverage is " + str(actual_coverage) +
                             " which is less than " + min_coverage)


def fetch_coverage_info(parser: callable, coverage_type: str) -> list:
    """
    Extract coverage information from BeautifulSoup parser.
    :return: a list that contains coverage_type, missed, total, and coverage percent
    """
    if coverage_type not in COVERAGE_INDEX_MAP.keys():
        raise ValueError("Coverage type must be either complexity, line, method, or class")
    missed = float(list(parser.tfoot.tr.children)[COVERAGE_INDEX_MAP[coverage_type][0]].string)
    total = float(list(parser.tfoot.tr.children)[COVERAGE_INDEX_MAP[coverage_type][1]].string)
    coverage = round((total - missed) / total * 100, 2)
    return [coverage_type, str(missed), str(total), str(coverage)]


def is_coverage_greater_than_min(coverage_type: str, expected_coverage: float) -> (bool, float):
    """
    Checks if actual coverage is greater than expected coverage.
    :returns: coverage_greater_than_min and actual_coverage
    """
    coverage_type = coverage_type.lower()
    actual_coverage = 0
    if coverage_type == "complexity":
        actual_coverage = float(COVERAGE_MAP["complexity"][3])
    elif coverage_type == "line":
        actual_coverage = float(COVERAGE_MAP["line"][3])
    elif coverage_type == "method":
        actual_coverage = float(COVERAGE_MAP["method"][3])
    elif coverage_type == "class":
        actual_coverage = float(COVERAGE_MAP["class"][3])

    return actual_coverage >= expected_coverage, actual_coverage


def map_coverage_info(coverage_info_array: list) -> None:
    """Maps coverage info to COVERAGE_MAP variable."""
    COVERAGE_MAP["complexity"] = coverage_info_array[0]
    COVERAGE_MAP["line"] = coverage_info_array[1]
    COVERAGE_MAP["method"] = coverage_info_array[2]
    COVERAGE_MAP["class"] = coverage_info_array[3]


def main():
    """Parse arguments."""
    parser = argparse.ArgumentParser()
    parser.add_argument('pomfile',
                        help='Provide file path for pom.xml')
    parser.add_argument('jacocofile',
                        help='Provide file path for jacoco\'s index.html')
    args = parser.parse_args()
    run(args.pomfile, args.jacocofile)


if __name__ == '__main__':
    main()
