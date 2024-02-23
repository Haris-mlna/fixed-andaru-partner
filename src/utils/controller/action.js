const actionAddToCart = param => {
	const { product, selectedUom1, selectedUom2, quantity1, quantity2 } = param;

	const body = {
		SupplierId: product.OrganizationId,
		ProductId: product.Id,
		ManufactureId: product.ManufactureId,
		TypeId: product.TypeId,
		SpecId: product.SpecificationId,
		SizeId: product.SizeId,
		UomId1: selectedUom1,
		UomdId2: selectedUom2,
		QuantityUom1: quantity1,
		QuantityUom2: quantity2,
		OrderNumber: null,
	};
};
