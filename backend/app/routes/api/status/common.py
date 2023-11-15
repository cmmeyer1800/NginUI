#! /usr/bin/env python3
"""
Common functions for status routes

Author: Collin Meyer
Last Modified: November 15, 2023
"""

def nginx_stub_decode(stub_info: str) -> dict:
    """Decoding of Nginx stub status text info into JSON
    More info on stub_status:
        https://www.keycdn.com/support/nginx-status#reading-the-nginx-status-page

    Args:
        stub_info (str): Nginx stub status text info

    Returns:
        dict: JSON representation of Nginx stub status
    """
    lines = stub_info.split("\n")

    connections = int(lines[0].strip().rstrip()[-1])

    req_data_line = lines[2].strip().rstrip().split(" ")
    conn_accepted = int(req_data_line[0])
    conn_handled = int(req_data_line[1])
    req_handled = int(req_data_line[2])

    curr_line = lines[3].strip().rstrip().split(" ")
    curr_reading = int(curr_line[1])
    curr_writing = int(curr_line[3])
    curr_waiting = int(curr_line[5])

    return {
        "active-connections": connections,
        "connections-accepted": conn_accepted,
        "connections-handled": conn_handled,
        "requests-handled": req_handled,
        "curr-reading": curr_reading,
        "curr-writing": curr_writing,
        "curr-waiting": curr_waiting,
    }
