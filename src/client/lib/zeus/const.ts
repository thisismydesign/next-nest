/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	DateTime: `scalar.DateTime` as const,
	Mutation:{
		createOrder:{

		}
	},
	ID: `scalar.ID` as const
}

export const ReturnTypes: Record<string,any> = {
	DateTime: `scalar.DateTime` as const,
	Mutation:{
		createOrder:"Order"
	},
	Order:{
		alias:"String",
		confirmedAt:"DateTime",
		created_at:"DateTime",
		id:"Int",
		thing:"Thing",
		updated_at:"DateTime",
		user:"User"
	},
	Query:{
		orders:"Order",
		things:"Thing",
		whoAmI:"User"
	},
	Thing:{
		created_at:"DateTime",
		id:"Int",
		name:"String",
		updated_at:"DateTime"
	},
	User:{
		created_at:"DateTime",
		id:"Int",
		name:"String",
		provider:"String",
		providerId:"String",
		updated_at:"DateTime",
		username:"String"
	},
	ID: `scalar.ID` as const
}

export const Ops = {
query: "Query" as const,
	mutation: "Mutation" as const
}