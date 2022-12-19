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

import { Commands } from './Commands';
import { EventType, formevent, FormsModule, MenuComponent, MenuEntry } from 'forms42core';

export class TopBar extends MenuComponent
{
	private menuelem:HTMLElement = null;

	constructor()
	{
		super(new Commands());
		this.options.skiproot = true;

		this.menuelem = document.getElementById("topbar");

		this.target = this.menuelem;
      this.show();
	}

	@formevent({type: EventType.Connect})
	public async onConnect() : Promise<boolean>
	{
		let entry:MenuEntry = await this.findEntry("/topbar/connection/connect");
		if (entry) entry.disabled = true;

		entry = await this.findEntry("/topbar/connection/disconnect");
		if (entry) entry.disabled = false;

		if (FormsModule.get().getRunningForms().length > 0)
		{
			entry = await this.findEntry("/topbar/query");
			if (entry) entry.disabled = false;

			entry = await this.findEntry("/topbar/record");
			if (entry) entry.disabled = false;
		}

		this.show();
		return(true);
	}

	@formevent({type: EventType.Disconnect})
	public async onDisConnect() : Promise<boolean>
	{
		let entry:MenuEntry = await this.findEntry("/topbar/connection/disconnect");
		if (entry) entry.disabled = true;

		entry = await this.findEntry("/topbar/connection/connect");
		if (entry) entry.disabled = false;

		entry = await this.findEntry("/topbar/query");
		if (entry) entry.disabled = true;

		entry = await this.findEntry("/topbar/record");
		if (entry) entry.disabled = true;

		entry = await this.findEntry("/topbar/transaction");
		if (entry) entry.disabled = true;

		this.show();
		return(true);
	}
}