import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		bgColor: string;
		textColor: string;
		accentColor: string;
		upwardColor: string;
		flatColor: string;
		downwardColor: string;
		cardColor: string;
		activeCardColor: string;
	}
}
