"""
This module contains functions for managing Nginx configurations.

Author: Collin Meyer
Last Modified: November 19, 2023

Functions:
- parse_config(conf: str) -> dict: Read Nginx config to get basic information.
- get_configs() -> list[dict]: Get all Nginx configs.
- delete_config(name: str) -> bool: Delete a configuration file.
- create_config(name: str, content: str) -> bool: Create a configuration file.
- verify_configs() -> tuple[bool, str]: Verify the NGINX configuration.
- get_config(name: str) -> str: Retrieve the content of a configuration file.
- set_config(name: str, content: str) -> bool: Set the content of a configuration file.
"""

import os
from datetime import datetime
import asyncio
import logging


def parse_config(conf: str) -> dict:
    """Read Nginx config to get basic information

    Args:
        conf (str): Nginx config file content

    Returns:
        tuple: (
            "server_name": str,
            "listen": str,
            "locations": int
        )
    """

    locs = conf.count("location")

    listen_start_index = conf.find("listen")
    listen_end_index = conf.find(";", listen_start_index)
    if listen_start_index == -1 or listen_end_index == -1:
        listen = "none"
    else:
        listen = conf[listen_start_index:listen_end_index].split()[1]

    server_name_start_index = conf.find("listen")
    server_name_end_index = conf.find(";", listen_start_index)
    if server_name_start_index == -1 or server_name_end_index == -1:
        server_name = "none"
    else:
        server_name = conf[server_name_start_index:server_name_end_index].split()[1]

    return (server_name, listen, locs)


def get_configs():
    """get all Nginx configs

    Returns:
        list[dict]: list of Nginx configs
    """

    try:
        confs = []

        for conf in os.listdir("/etc/nginx/conf.d"):
            with open(f"/etc/nginx/conf.d/{conf}", "r", encoding="utf-8") as f:
                conf_content = f.read()
                parsed_conf = parse_config(conf_content)
                confs.append(
                    {
                        "name": conf,
                        "server_name": parsed_conf[0],
                        "listen": parsed_conf[1],
                        "locations": parsed_conf[2],
                        "last_modified": datetime.fromtimestamp(
                            os.path.getmtime(f"/etc/nginx/conf.d/{conf}")
                        ).strftime("%m/%d/%Y-%H:%M:%S"),
                    }
                )
    except IOError as e:
        logging.error(e)
        return None

    return confs


def delete_config(name: str) -> bool:
    """
    Deletes a configuration file with the given name.

    Args:
        name (str): The name of the configuration file to delete.

    Returns:
        bool: True if the configuration file was successfully deleted, False otherwise.
    """
    config_path = f"/etc/nginx/conf.d/{name}"
    if os.path.exists(config_path):
        try:
            os.remove(config_path)
            return True
        except IOError as e:
            logging.error(e)
            return False
    else:
        return False


def create_config(name: str, content: str) -> bool:
    """
    Create a configuration file with the given name and content.

    Args:
        name (str): The name of the configuration file.
        content (str): The content to be written to the configuration file.

    Returns:
        bool: 0 if the configuration file was successfully created,
              1 if the configuration file already exists, 2 otherwise.
    """
    config_path = f"/etc/nginx/conf.d/{name}"
    if os.path.exists(config_path):
        return 1
    try:
        with open(config_path, "w", encoding="utf-8") as f:
            f.write(content)
        return 0
    except IOError as e:
        logging.error(e)
        return 2


async def verify_configs():
    """
    Verify the NGINX configuration by running the 'nginx -t' command.

    Returns:
        A tuple containing two values:
        - A boolean indicating whether the test passed or failed.
        - A string containing the error message if the test failed, otherwise an empty string.
    """
    proc = await asyncio.create_subprocess_exec(
        "nginx", "-t", stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE
    )

    _, stderr = await proc.communicate()
    stderr = stderr.decode("utf-8")

    return ("test failed" not in stderr, stderr)


def get_config(name: str) -> str:
    """
    Retrieve the content of a configuration file.

    Args:
        name (str): The name of the configuration file.

    Returns:
        str: The content of the configuration file if it exists, None otherwise.
    """
    config_path = f"/etc/nginx/conf.d/{name}"
    if os.path.exists(config_path):
        try:
            with open(config_path, "r", encoding="utf-8") as f:
                return f.read()
        except IOError as e:
            logging.error(e)
            return None
    else:
        return None


def set_config(name: str, content: str) -> bool:
    """
    Sets the content of a configuration file.

    Args:
        name (str): The name of the configuration file.
        content (str): The content to be written to the configuration file.

    Returns:
        bool: True if the configuration file was successfully written, False otherwise.
    """
    config_path = f"/etc/nginx/conf.d/{name}"
    if os.path.exists(config_path):
        try:
            with open(config_path, "w", encoding="utf-8") as f:
                f.write(content)
            return True
        except IOError as e:
            logging.error(e)
            return False
    else:
        return False
