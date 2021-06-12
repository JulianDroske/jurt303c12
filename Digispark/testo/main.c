#include "avr/io.h"
#include "util/delay.h"

#define LED PB3
#define DELAY 500

int main(void){
	uint8_t high = 0;
	uint16_t ms = 0;

	DDRB |= (1 << LED);

	PORTB &= ~(1 << LED);

	while(1){
		high = !high;
		if(high) PORTB |= (1 << LED);
		else PORTB &= ~(1 << LED);

		for(ms=DELAY; ms>0; ms-=10){
			_delay_ms(10);
		}
	}
	return 0;
 }
