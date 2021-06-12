#!/bin/sh

printk off
brightness.sh 3
pm-powersave true

cp -rf /root/.ro/* /

# change mac addr
# ifconfig mlan0 up
# ip link set dev mlan0 down
# ip link set dev mlan0 address $(./genmac.sh)
# ip link set dev mlan0 up

# not start dbus daemon

for x in 2 3 4 5 6 7 8 9 10; do
	/sbin/agetty -o '-p -- root' --noclear tty$x linux &
done

# switch to debian and enable consoles.
# dietpi &
