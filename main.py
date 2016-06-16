#!/usr/bin/python

import os
import sys
import fileinput


def which(program):
    def is_exe(fpath):
        return os.path.isfile(fpath) and os.access(fpath, os.X_OK)

    fpath, fname = os.path.split(program)
    if fpath:
        if is_exe(program):
            return program
    else:
        for path in os.environ["PATH"].split(os.pathsep):
            path = path.strip('"')
            exe_file = os.path.join(path, program)
            if is_exe(exe_file):
                return exe_file
    return None


if which("jpm") is None:
    sys.stderr.write("\n\t[-]\tNo 'jpm' found. Please read REAME.md file.\n\n")
    sys.exit(-1)

old_server = raw_input(
    "Please old server name[www.morirt.com]:") or "www.morirt.com"
new_server = raw_input("What is the server name: ")

if new_server != "":
    # Replace the script
    f = open('index.js', 'r')
    filedata = f.read()
    f.close()
    newdata = filedata.replace("var server = \"http://%s\"" %
                               old_server, "var server = \"http://%s\"" % new_server)
    f = open('index.js', 'w')
    f.write(newdata)
    f.close()

sys.stdout.write("\t[+]\tSettings are good. Creating XPI file.\n")
os.system("jpm xpi")
