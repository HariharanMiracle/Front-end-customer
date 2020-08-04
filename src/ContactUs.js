import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';

export default function AboutUs() {
  const [datatable, setDatatable] = React.useState({
    columns: [
	  {
		label: 'Customer Number',
		field: 'customerNumber',
		sort: 'asc',
		width: 100,
	  },
	  {
		label: 'Customer Id',
		field: 'customerId',
		width: 100,
	  },	  
      {
        label: 'Customer Name',
        field: 'customerName',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Customer Name',
        },
      },
      {
        label: 'Customer Picture',
        field: 'customerPicture',
        width: 270,
      },
      {
        label: 'Edit',
        field: 'Edit',
        width: 200,
      },
      {
        label: 'Delete',
        field: 'Delete',
        width: 100,
      },
    ],
    rows: [
      {
		customerNumber: '1',
		customerId: '652',
		customerName: 'Hariharan',
		customerPicture: <img src="/uploads/customer/picture1.JPG" height="150px" width="150px"/>,
		Edit: <button className="btn btn-info">Edit Customer</button>,
		Delete: <button className="btn btn-danger ml-2">Delete Customer</button>,
	  },
	  {
		customerNumber: '2',
		customerId: '752',
		customerName: 'Dharaniya',
		customerPicture: <img src="/uploads/customer/picture2.JPG" height="150px" width="150px"/>,
		Edit: <button className="btn btn-info">Edit Customer</button>,
		Delete: <button className="btn btn-danger ml-2">Delete Customer</button>,
      },
    ],
  });

  return <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} />;
}