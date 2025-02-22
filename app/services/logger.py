from datetime import datetime

class Logger:
    def __init__(self):
        pass

    def log(self, message):
        print(f"LOG:      {datetime.now()} - {message}")
