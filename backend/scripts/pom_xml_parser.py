#!/usr/bin/env python3

"""Read pom.xml file and parse."""

import xml.etree.ElementTree as ET
import argparse
import colorama

MAVEN_APACHE_URL = './/{http://maven.apache.org/POM/4.0.0}'


def run(file: str) -> (str, str):
    """Run this file's logic."""
    xml_tree = ET.parse(file)
    coverage_type = xml_tree.find(MAVEN_APACHE_URL + 'counter').text
    min_coverage = str(float(xml_tree.find(MAVEN_APACHE_URL + 'minimum').text) * 100)
    print(colorama.Fore.RED + "We are currently using " + coverage_type + " coverage.")
    print(colorama.Fore.RED + "The required coverage is at least " + min_coverage + "%.")
    return coverage_type, min_coverage


def main():
    """Parse arguments."""
    parser = argparse.ArgumentParser()
    parser.add_argument('file',
                        help='Provide file path for pom.xml')
    args = parser.parse_args()
    run(args.file)


if __name__ == '__main__':
    main()
