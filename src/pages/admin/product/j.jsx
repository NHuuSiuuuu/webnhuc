{data?.products?.map((item) => {
  const size = item.product_id?.sizes?.find(
    (s) => s._id === item.size_id
  );

  return (
    <tr
      key={item._id}
      className="border-b-[#ededed] my-[10px] border-dotted border-b-[1px]"
    >
      {/* Ảnh */}
      <td>
        <Link to={`/products/${item?.product_id?.slug}`}>
          <img
            className="max-w-[100px]"
            src={item?.product_id?.thumbnail[0]}
            alt={item?.product_id?.title}
          />
        </Link>
      </td>

      {/* Thông tin */}
      <td className="py-[20px] pl-[15px]">
        <Link to={`/products/${item?.product_id?.slug}`}>
          <h3 className="mb-[5px] text-[16px] font-bold text-[#a47b67]">
            {item?.product_id?.title}
          </h3>
        </Link>

        <p className="mb-[5px] text-[#a47b67]">
          {formatPrice(
            calculateDiscountedPrice(
              item?.product_id?.price,
              item?.product_id?.discountPercentage
            )
          )}
        </p>

        <p className="mb-[5px] text-[#a47b67] uppercase">
          Size: <b>{size?.name || "N/A"}</b>
        </p>

        <p className="text-[#a47b67]">
          Số lượng: {item.quantity}
        </p>
      </td>
    </tr>
  );
})}
