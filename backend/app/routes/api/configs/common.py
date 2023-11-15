import os

def diff_sync_status(db_confs: list[dict]):

    confs = os.listdir("/etc/nginx/conf.d")
    db_names = [c["name"] for c in db_confs]

    missing_from_os = [c["name"] for c in db_confs if c["name"] not in confs]
    missing_from_db = [c for c in confs if c not in db_names]

    print(f"Missing from OS: {missing_from_os}")
    print(f"Missing from DB: {missing_from_db}")

    return {
        "missing_from_os": missing_from_os,
        "missing_from_db": missing_from_db
    }