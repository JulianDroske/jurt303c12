#!/bin/sh

SP=
expr "$(echo -e)" '==' '-e' 2>&1 >/dev/null || SP='-e'

echo ${SP} Capacity:'\t'$(cat /sys/class/power_supply/sbs-104-000b/capacity)%
echo ${SP} Charging:'\t'$(cat /sys/class/power_supply/tps65090-ac/online |sed 's/0/false/' |sed 's/1/true/' )
