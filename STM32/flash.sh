#!/bin/sh

cd "$(dirname $0)"

if [ ! -n "$1" -o ! -f "$1" ];then
	echo Incorrect arguments.
	echo "Usage: $0 <binfile>"
	exit -1;
fi

python stm32loader.py -p /dev/ttyUSB0 -e -w -v "$1"
