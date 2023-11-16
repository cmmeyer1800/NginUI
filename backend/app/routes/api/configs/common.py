import os
from datetime import datetime
import os

# def diff_sync_status(db_confs: list[dict]):

#     confs = os.listdir("/etc/nginx/conf.d")
#     db_names = [c["name"] for c in db_confs]

#     missing_from_os = [c["name"] for c in db_confs if c["name"] not in confs]
#     missing_from_db = [c for c in confs if c not in db_names]

#     print(f"Missing from OS: {missing_from_os}")
#     print(f"Missing from DB: {missing_from_db}")

#     return {
#         "missing_from_os": missing_from_os,
#         "missing_from_db": missing_from_db
#     }


def parse_config(conf: str) -> dict:

    locs = conf.count("location")

    listen_start_index = conf.find("listen")
    listen_end_index = conf.find(";", listen_start_index)
    listen = conf[listen_start_index:listen_end_index].split()[1]

    server_name_start_index = conf.find("listen")
    server_name_end_index = conf.find(";", listen_start_index)
    server_name = conf[server_name_start_index:server_name_end_index].split()[1]

    return (server_name, listen, locs)



def get_configs():

    try:
        confs = []

        for conf in os.listdir("/etc/nginx/conf.d"):
            with open(f"/etc/nginx/conf.d/{conf}", "r") as f:
                conf_content = f.read()
                parsed_conf = parse_config(conf_content)
                confs.append({
                    "name": conf,
                    "server_name": parsed_conf[0],
                    "listen": parsed_conf[1],
                    "locations": parsed_conf[2], 
                    "last_modified": datetime.fromtimestamp(
                        os.path.getmtime(f"/etc/nginx/conf.d/{conf}")
                    ).strftime('%m/%d/%Y-%H:%M:%S')
                })
    except Exception as e:
        print(e) # TODO: use logging
        return None

    return confs


def delete_config(name: str) -> bool:
    config_path = f"/etc/nginx/conf.d/{name}"
    if os.path.exists(config_path):
        try:
            os.remove(config_path)
            return True
        except Exception as e:
            print(e) # TODO: use logging
            return False
    else:
        return False


def create_config(name: str, content: str) -> bool:
    config_path = f"/etc/nginx/conf.d/{name}"
    if os.path.exists(config_path):
        return 1
    else:
        try:
            with open(config_path, "w") as f:
                f.write(content)
            return 0
        except Exception as e:
            print(e) # TODO: use logging
            return 2
