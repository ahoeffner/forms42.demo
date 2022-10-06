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

import content from './MasterDetail.html';

import { BaseForm } from '../../../BaseForm';
import { Key, datasource } from 'forms42core';
import { Employees } from "../../../datasources/database/Employees";
import { Departments } from "../../../datasources/database/Departments";

@datasource("InDept",Employees)
@datasource("Employees",Employees)
@datasource("Departments",Departments)

export class MasterDetail extends BaseForm
{
	constructor()
	{
		super(content);
		this.title = "Master Detail";

		let DeptId:Key = new Key("DeptId","Departments","department_id");
		let EmpByDept:Key = new Key("EmpByDept","Employees","department_id");

		let Manager:Key = new Key("Manager","Employees","employee_id");
		let EmpByMgr:Key = new Key("EmpByMgr","Indept","manager_id");

		this.link(DeptId,EmpByDept);
		this.link(Manager,EmpByMgr);
	}
}
