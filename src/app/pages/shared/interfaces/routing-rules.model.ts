export interface RoutingRulesInterface {
	data: data
	message: string;
	success: boolean;
}

export interface data {
	count: number;
	routingRules: [{
		id: number;
		default_ds: string;
		rule: string;
		rule_config: string;
		use_default: boolean
	}]
}
