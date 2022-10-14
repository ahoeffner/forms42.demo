/*
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 3 only, as
 * published by the Free Software Foundation.

 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 */

import { QueryFilter as Type, DataSource, Filter, Filters } from "forms42core";

export class Contains implements Type
{
	private filter$:Filter;
	private source$:DataSource;

	constructor(source:DataSource, fields:string|string[])
	{
		this.source$ = source;
		this.filter$ = Filters.Contains(fields);
		this.source$.addFilter(this.filter$);
	}

	public source() : DataSource
	{
		return(this.source$);
	}

	query(criteria:string): boolean
	{
		this.filter$.constraint = criteria;
		return(true);
	}
}