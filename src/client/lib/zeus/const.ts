/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	DateTime: `scalar.DateTime` as const,
	ID: `scalar.ID` as const
}

export const ReturnTypes: Record<string,any> = {
	DateTime: `scalar.DateTime` as const,
	Query:{
		things:"Thing",
		users:"User"
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
query: "Query" as const
}