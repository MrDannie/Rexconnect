export interface StationsInterface {
	stations: [{
		authPassword: null | string;
		authUsername: null | string
		baseUrl: null | string
		channelConfig: {id: 3, adapterClassName: "org.jpos.q2.iso.ChannelAdaptor", adapterName: "transware-channel", channelClassName: "org.jpos.iso.channel.XMLChannel", channelIn: "transware-send", …}
		isActive: 1
		lastEcho: null
		lastZpkChange: null
		muxConfig: {id: 3, logger: "Q2", muxClass: "org.jpos.q2.iso.QMUX", muxIn: "transware-receive", muxOut: "transware-send", …}
		name: "transware"
		zmk: "S1009652TN00S000236B04F245C29E25261580228F788E7597CB8BE2A62924B2DE3EEF0BA3C8C4867EC5D467468DFDB53"
		zpk: "S1009672TN00S0002C7D1008713941F35BEE6C92AD3D178A2CC6D33E7E74B326ADB37FAE050BEE22FF5CB938444BABD09"
	}]
}
