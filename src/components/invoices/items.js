import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PageHeading from "../common/pageHeading";
import MTable from "../common/Mtable";
import ModalComponent from "../common/modal/modal";
import AddItem from "./addItems";
import { 
	getItems, 
	emptyItemDetails, 
	getItemDetail,
	deleteItem
	 } from "../../redux/actions/invoiceActions";
import * as invoiceTypes from '../../redux/types/invoiceTypes';

const Items = (props) => {

	const { items, deleteItem, getItems, getItemDetail, emptyItemDetails, masterId } = props;

	const [addItemModalState, toggleaddItemModalState] = useState(false);
	const [editItem, setEditItem] = useState(false);
   
	const toggleAddItemModal = async () => {
		toggleaddItemModalState(!addItemModalState);
		setEditItem(false);
		await emptyItemDetails();
	}
	//console.log(editItem);
   
	 const editFunc = async(id) => {
			await getItemDetail(id);
			setEditItem(true);
			toggleaddItemModalState(!addItemModalState);
	}

console.log(items);

	useEffect(()=>{
		//here, length is not checking bcz everytime need different values based on the masterId
		//if(items.items.length === 0) {	
			getItems(masterId)
		//}
		
		
	}, []);



	return (
			<>

				<PageHeading
					heading="Items"
					showButton={true}
					buttonLabel="Add Item"
					onClick={toggleAddItemModal}
				/>
			
				<MTable 
					tableData={items.items}
					contentFlag={invoiceTypes.ITEMS_FLAG}
					editFunc={editFunc}
					deleteFunc={deleteItem}
				/>

				<ModalComponent
					modalClassName={"modal-dialog-edititem"}
					title={ editItem ? "Edit Item": "Save" }
					modalState={addItemModalState}
					message={<AddItem masterId={masterId} toggleModal={toggleAddItemModal} editFlag={editItem} />}
					toggleModal={toggleAddItemModal}
				/>

			</>

	)
}

const mapStateToProps = (state) => ({
	items: state.invoiceReducer.itemlist
});

const mapDipatchToProps = {
	getItems,
	getItemDetail,
	emptyItemDetails,
	deleteItem
}

export default connect(mapStateToProps, mapDipatchToProps)(Items);