#include "stm32f10x_conf.h"
#include "stm32f10x.h"
#include "stm32f10x_gpio.h"
#include "stm32f10x_gpio.c"
#include "stm32f10x_rcc.h"
#include "stm32f10x_rcc.c"

// #include "jurt.h"

void delay_ms(u16 ms){
	u16 i,j;
	for(i=0; i<ms;++i){
		for(j=0; j<72; ++j);
	}
}

int main(){
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOC, ENABLE);
	
	GPIO_InitTypeDef GPIO_InitStructure;
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_13;
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_Out_PP;
	GPIO_Init(GPIOC, &GPIO_InitStructure);
	GPIO_SetBits(GPIOC, GPIO_Pin_13);
	
	while(1){
		delay_ms(500);
		GPIO_ResetBits(GPIOC, GPIO_Pin_13);
		delay_ms(500);
		GPIO_SetBits(GPIOC, GPIO_Pin_13);
	}
	return 0;
}

void SystemInit(void){
	
}
