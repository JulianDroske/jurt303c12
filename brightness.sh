#!/bin/sh

PTH=/sys/class/backlight/backlight

EXPR(){
	expr "$@" >/dev/null
	return $?
}

EXPR "$1" '==' '' && echo $(cat $PTH/brightness) && exit

MAX=$(cat $PTH/max_brightness)

( EXPR $1 '>' $MAX || EXPR $1 '<' 1 ) && echo Args must be from 1 to $MAX && exit

echo $1 > $PTH/brightness
