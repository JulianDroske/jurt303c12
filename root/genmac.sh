#!/bin/sh

# used saved threee bytes
# skipped

hexb(){
	echo $(dd if=/dev/urandom bs=1 count=1 2>/dev/null |hexdump -e '/1 "%02x"' 2>/dev/null)
}

MACC=$(hexb)

for x in 1 2 3 4 5 ; do
	MACC=$MACC:$(hexb)
done

echo $MACC
