<div className="min-h-screen p-4 md:p-6 bg-white dark:bg-[#0f1117]">

      {/* ── Header ── */}


      {/* ── Filter Section ── */}
      <div className="p-4 mb-6 rounded-xl border shadow-sm
                      bg-white        dark:bg-[#16181f]
                      border-gray-200 dark:border-white/[0.06]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Status Filter */}
          <div>
            <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider
                               text-gray-400 dark:text-gray-500">
              Trạng thái
            </label>
            <select
              value={statusFilter}
              onChange={handleStatusFilter}
              className="w-full px-3 py-2 text-sm rounded-lg border transition
                         bg-white        dark:bg-[#0f1117]
                         border-gray-300 dark:border-white/[0.08]
                         text-gray-700   dark:text-gray-200
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Dừng hoạt động</option>
            </select>
          </div>

          {/* Featured Filter */}
          <div>
            <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider
                               text-gray-400 dark:text-gray-500">
              Nổi bật
            </label>
            <select
              value={filter}
              onChange={handleFeaturedFilter}
              className="w-full px-3 py-2 text-sm rounded-lg border transition
                         bg-white        dark:bg-[#0f1117]
                         border-gray-300 dark:border-white/[0.08]
                         text-gray-700   dark:text-gray-200
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Tất cả</option>
              <option value="1">Nổi bật</option>
              <option value="0">Không nổi bật</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider
                               text-gray-400 dark:text-gray-500">
              Sắp xếp
            </label>
            <select
              value={sort}
              onChange={handleSort}
              className="w-full px-3 py-2 text-sm rounded-lg border transition
                         bg-white        dark:bg-[#0f1117]
                         border-gray-300 dark:border-white/[0.08]
                         text-gray-700   dark:text-gray-200
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Mặc định</option>
              <option value="title:asc">Tên: A → Z</option>
              <option value="title:desc">Tên: Z → A</option>
              <option value="price:desc">Giá: Cao → Thấp</option>
              <option value="price:asc">Giá: Thấp → Cao</option>
              <option value="position:asc">Vị trí: Thấp → Cao</option>
              <option value="position:desc">Vị trí: Cao → Thấp</option>
            </select>
          </div>

          {/* Reset */}
          <div className="flex items-end">
            <button
              onClick={() => { setFilter(""); setSort(""); setStatusFilter(""); }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition
                         bg-white           dark:bg-transparent
                         border-gray-300    dark:border-white/[0.08]
                         text-gray-600      dark:text-gray-400
                         hover:bg-gray-50   dark:hover:bg-white/[0.04]
                         hover:text-gray-800 dark:hover:text-gray-200"
            >
              <FontAwesomeIcon icon={faArrowsRotate} />
              Xóa bộ lọc
            </button>
          </div>
        </div>

        {/* Active filter chips */}
        {(statusFilter || filter || sort) && (
          <div className="pt-4 mt-4 border-t border-gray-100 dark:border-white/[0.06]">
            <h3 className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500">
              Đang lọc
            </h3>
            <div className="flex flex-wrap gap-2">
              {statusFilter && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full
                                 text-indigo-700    dark:text-indigo-300
                                 bg-indigo-100      dark:bg-indigo-500/10
                                 border border-indigo-200 dark:border-indigo-500/20">
                  {statusFilter === "active" ? "Đang hoạt động" : "Dừng hoạt động"}
                  <button onClick={() => setStatusFilter("")}
                    className="leading-none opacity-60 hover:opacity-100">×</button>
                </span>
              )}
              {filter && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full
                                 text-purple-700    dark:text-purple-300
                                 bg-purple-100      dark:bg-purple-500/10
                                 border border-purple-200 dark:border-purple-500/20">
                  Nổi bật: {filter === "1" ? "Có" : "Không"}
                  <button onClick={() => setFilter("")}
                    className="leading-none opacity-60 hover:opacity-100">×</button>
                </span>
              )}
              {sort && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full
                                 text-emerald-700   dark:text-emerald-300
                                 bg-emerald-100     dark:bg-emerald-500/10
                                 border border-emerald-200 dark:border-emerald-500/20">
                  {sort.includes("price") ? "Giá" : "Tên"} {sort.includes("asc") ? "↑" : "↓"}
                  <button onClick={() => setSort("")}
                    className="leading-none opacity-60 hover:opacity-100">×</button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Table / Empty ── */}
      {data.products.length === 0 ? (
        <div className="py-16 text-center rounded-xl border
                        bg-white        dark:bg-[#16181f]
                        border-gray-200 dark:border-white/[0.06]">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Không có sản phẩm nào
          </p>
        </div>
      ) : (
        <div className="rounded-xl border overflow-hidden
                        bg-white        dark:bg-[#16181f]
                        border-gray-200 dark:border-white/[0.06]">

          {/* Desktop table — ẩn trên mobile */}
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/[0.06]
                               bg-gray-50 dark:bg-white/[0.02]">
                  {["Sản phẩm","Danh mục","Giá","Tồn kho","Trạng thái","Người tạo","Hành động"].map((col) => (
                    <th key={col}
                      className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider
                                 text-gray-500 dark:text-gray-500">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-white/[0.04]">
                {data.products.map((item) => (
                  <tr key={item._id}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-white/[0.02]">

                    {/* Product */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-11 h-11 rounded-lg overflow-hidden border
                                        bg-gray-100     dark:bg-white/[0.05]
                                        border-gray-200 dark:border-white/[0.08]">
                          {item?.thumbnail?.[0] ? (
                            <img className="object-cover w-full h-full"
                              src={item.thumbnail[0]} alt={item.title} />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full">
                              <FontAwesomeIcon icon={faImage}
                                className="text-gray-400 dark:text-gray-600" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate max-w-[180px]
                                        text-gray-900 dark:text-gray-100">
                            {item.title}
                          </p>
                          <p className="text-xs truncate max-w-[180px] mt-0.5
                                        text-gray-500 dark:text-gray-500">
                            {item.description || "Không có mô tả"}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {item.featured === "1" && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium
                                               text-yellow-700 dark:text-yellow-400
                                               bg-yellow-100   dark:bg-yellow-400/10">
                                <FontAwesomeIcon icon={faStar} className="text-[8px]" />
                                Nổi bật
                              </span>
                            )}
                            <span className="text-[11px] text-gray-400 dark:text-gray-600">
                              Vị trí: {item.position || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {item.category_id ? categoryMap[item.category_id] : "—"}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-medium text-gray-900 tabular-nums dark:text-gray-100">
                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price)}
                      </p>
                      {item.discountPercentage > 0 && (
                        <p className="text-xs text-red-500 dark:text-red-400">
                          -{item.discountPercentage}%
                        </p>
                      )}
                    </td>

                    {/* Stock */}
                    <td className="px-5 py-3.5">
                      <span className={`text-sm font-medium tabular-nums ${
                        item.stock > 10
                          ? "text-emerald-600 dark:text-emerald-400"
                          : item.stock > 0
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-red-600 dark:text-red-400"
                      }`}>
                        {item.stock}
                        <span className="ml-1 text-xs font-normal text-gray-400 dark:text-gray-600">sp</span>
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                        item.status === "active"
                          ? "text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20"
                          : "text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-500/10 border-red-200 dark:border-red-500/20"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          item.status === "active" ? "bg-emerald-500" : "bg-red-500"
                        }`} />
                        {item.status === "active" ? "Hoạt động" : "Dừng hoạt động"}
                      </span>
                    </td>

                    {/* Created by */}
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {item.createBy?.account_id?.fullName || "—"}
                      </p>
                      <p className="text-xs mt-0.5 text-gray-400 dark:text-gray-600">
                        {new Date(item?.createBy?.createdAt).toLocaleString("vi-VN")}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Link to={`/admin/product/update/${item._id}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition
                                     text-indigo-600    dark:text-indigo-400
                                     border-indigo-200  dark:border-indigo-500/30
                                     hover:bg-indigo-50 dark:hover:bg-indigo-500/10">
                          <FontAwesomeIcon icon={faPenToSquare} />
                          Sửa
                        </Link>
                        <button type="button" onClick={() => handleRemoveProduct(item._id)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition
                                     text-red-600    dark:text-red-400
                                     border-red-200  dark:border-red-500/30
                                     hover:bg-red-50 dark:hover:bg-red-500/10">
                          <FontAwesomeIcon icon={faTrashCan} />
                          Xóa
                        </button>
                        <Link to={`/admin/product/detail/${item._id}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition
                                     text-gray-600     dark:text-gray-400
                                     border-gray-200   dark:border-white/[0.08]
                                     hover:bg-gray-100 dark:hover:bg-white/[0.06]">
                          <FontAwesomeIcon icon={faInfo}
                            className="text-[7px] p-0.5 border rounded-full border-current" />
                          Chi tiết
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card list — hiện trên mobile, ẩn trên md+ */}
          <div className="md:hidden divide-y divide-gray-100 dark:divide-white/[0.04]">
            {data.products.map((item) => (
              <div key={item._id} className="p-4 space-y-3">
                {/* Top row: ảnh + tên + badge */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border
                                  bg-gray-100     dark:bg-white/[0.05]
                                  border-gray-200 dark:border-white/[0.08]">
                    {item?.thumbnail?.[0] ? (
                      <img className="object-cover w-full h-full"
                        src={item.thumbnail[0]} alt={item.title} />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <FontAwesomeIcon icon={faImage}
                          className="text-gray-400 dark:text-gray-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-100">
                      {item.title}
                    </p>
                    <p className="text-xs truncate mt-0.5 text-gray-500 dark:text-gray-500">
                      {item.description || "Không có mô tả"}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {item.featured === "1" && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium
                                         text-yellow-700 dark:text-yellow-400
                                         bg-yellow-100   dark:bg-yellow-400/10">
                          <FontAwesomeIcon icon={faStar} className="text-[8px]" /> Nổi bật
                        </span>
                      )}
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                        item.status === "active"
                          ? "text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20"
                          : "text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-500/10 border-red-200 dark:border-red-500/20"
                      }`}>
                        <span className={`w-1 h-1 rounded-full ${item.status === "active" ? "bg-emerald-500" : "bg-red-500"}`} />
                        {item.status === "active" ? "Hoạt động" : "Dừng"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Meta row: giá + tồn kho + danh mục */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-gray-400 dark:text-gray-500 mb-0.5">Giá</p>
                    <p className="font-medium text-gray-800 tabular-nums dark:text-gray-200">
                      {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price)}
                    </p>
                    {item.discountPercentage > 0 && (
                      <p className="text-red-500 dark:text-red-400">-{item.discountPercentage}%</p>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-400 dark:text-gray-500 mb-0.5">Tồn kho</p>
                    <p className={`font-medium ${
                      item.stock > 10 ? "text-emerald-600 dark:text-emerald-400"
                      : item.stock > 0 ? "text-yellow-600 dark:text-yellow-400"
                      : "text-red-600 dark:text-red-400"
                    }`}>
                      {item.stock} sp
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 dark:text-gray-500 mb-0.5">Danh mục</p>
                    <p className="text-gray-700 truncate dark:text-gray-300">
                      {item.category_id ? categoryMap[item.category_id] : "—"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <Link to={`/admin/product/update/${item._id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-lg border transition
                               text-indigo-600    dark:text-indigo-400
                               border-indigo-200  dark:border-indigo-500/30
                               hover:bg-indigo-50 dark:hover:bg-indigo-500/10">
                    <FontAwesomeIcon icon={faPenToSquare} /> Sửa
                  </Link>
                  <Link to={`/admin/product/detail/${item._id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-lg border transition
                               text-gray-600     dark:text-gray-400
                               border-gray-200   dark:border-white/[0.08]
                               hover:bg-gray-100 dark:hover:bg-white/[0.06]">
                    Chi tiết
                  </Link>
                  <button type="button" onClick={() => handleRemoveProduct(item._id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-lg border transition
                               text-red-600    dark:text-red-400
                               border-red-200  dark:border-red-500/30
                               hover:bg-red-50 dark:hover:bg-red-500/10">
                    <FontAwesomeIcon icon={faTrashCan} /> Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3.5 border-t
                          bg-gray-50      dark:bg-white/[0.01]
                          border-gray-200 dark:border-white/[0.06]">
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Trang <span className="font-medium text-gray-600 dark:text-gray-300">{page + 1}</span>
              {data.totalPage && (
                <> / <span className="font-medium text-gray-600 dark:text-gray-300">{data.totalPage}</span></>
              )}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition ${
                  page === 0
                    ? "cursor-not-allowed opacity-40 text-gray-400 dark:text-gray-600 border-gray-200 dark:border-white/[0.06] bg-transparent"
                    : "text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/[0.08] hover:bg-gray-100 dark:hover:bg-white/[0.06]"
                }`}
              >
                ← Trước
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page + 1 === data.totalPage}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition ${
                  page + 1 === data.totalPage
                    ? "cursor-not-allowed opacity-40 text-gray-400 dark:text-gray-600 border-gray-200 dark:border-white/[0.06] bg-transparent"
                    : "text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/[0.08] hover:bg-gray-100 dark:hover:bg-white/[0.06]"
                }`}
              >
                Sau →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>