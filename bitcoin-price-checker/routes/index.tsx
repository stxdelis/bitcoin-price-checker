/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
const url: string = "https://api.coindesk.com/v1/bpi/currentprice.json";

export interface Price {
	time: Time;
	disclaimer: string;
	chartName: string;
	bpi: Bpi;
}

export interface Time {
	updated: string;
	updatedISO: string;
	updateduk: string;
}

export interface Bpi {
	USD: Usd;
	GBP: Gbp;
	EUR: Eur;
}

export interface Usd {
	code: string;
	symbol: string;
	rate: string;
	description: string;
	rate_float: number;
}

export interface Gbp {
	code: string;
	symbol: string;
	rate: string;
	description: string;
	rate_float: number;
}

export interface Eur {
	code: string;
	symbol: string;
	rate: string;
	description: string;
	rate_float: number;
}

// Handler function is run whenever the root is accessed/used to fetch data and render it out
export const handler: Handlers<Price | null> = {
	async GET(_, ctx) {
		const resp = await fetch(url);
		if (resp.status === 200) {
			const price: Price = await resp.json();
			console.log(price);
			return ctx.render(price);
		}
		return ctx.render(null);
	},
};

export default function Home({ data }: PageProps<Price | null>) {
	if (!data) {
		return <h1>Data is not available</h1>;
	}

	return (
		<div class={tw`w-screen h-screen bg-gray-900`}>
			<div class={tw`p-4 mx-auto max-w-screen-md bg-gray-900`}>
				<img
					src="./bc.jpg"
					width="200px"
					class="mx-auto"
					alt="the fresh logo: a sliced lemon dripping with juice"
				/>
				<p class={tw`my-10 text(center 3xl white)`}>Bitcoin Price Checker </p>
				<p class={tw`my-10 text(center 2xl white)`}>
					USD: ${data.bpi.USD.rate}
				</p>
				<p class={tw`my-10 text(center 2xl white)`}>
					EUR: €{data.bpi.EUR.rate}
				</p>
				<p class={tw`my-10 text(center 2xl white)`}>
					GBP: £{data.bpi.GBP.rate}
				</p>
			</div>
		</div>
	);
}
