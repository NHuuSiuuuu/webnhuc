/* =====================
   Trừ stock (dễ hiểu)
===================== */

     <div className="space-y-8">
                {order.timeline.map((item, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        item.completed 
                          ? 'border-black bg-black' 
                          : 'border-gray-300 bg-white'
                      }`}>
                        {item.completed ? (
                          <CheckCircle className="w-5 h-5 text-white" strokeWidth={2} />
                        ) : (
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        )}
                      </div>
                      {index < order.timeline.length - 1 && (
                        <div className={`w-0.5 h-16 ${item.completed ? 'bg-black' : 'bg-gray-200'}`}></div>
                      )}
                    </div>
                    
                    <div className="flex-1 pb-8">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`font-light text-base ${item.completed ? 'text-black' : 'text-gray-500'}`}>
                          {item.status}
                        </h3>
                        {item.time && (
                          <span className="text-xs text-gray-600">{item.time}</span>
                        )}
                      </div>
                      <p className="text-sm font-light text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
//      <div className="bg-white border-b shadow-sm">
//         <div className="px-4 py-4 mx-auto sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between">
//             <h1 className="text-2xl font-bold text-gray-900">
//               Quản lý đơn hàng
//             </h1>
//             <div className="flex gap-2">
//               <button className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
//                 <FontAwesomeIcon icon={faDownload} />
//                 <span>Xuất Excel</span>
//               </button>
//               <button className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
//                 <FontAwesomeIcon icon={faPrint} />
//                 <span>In</span>
//               </button>
//               <button className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
//                 <FontAwesomeIcon icon={faSync} />
//                 <span>Làm mới</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="px-4 py-6 mx-auto sm:px-6 lg:px-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-5 gap-4 mb-6">
//           <div className="p-4 bg-white rounded-lg shadow">
//             <p className="text-sm text-gray-600">Tổng đơn hàng</p>
//             <p className="text-2xl font-bold text-gray-900">156</p>
//             <p className="text-xs text-green-600">↑ 12% so với tháng trước</p>
//           </div>
//           <div className="p-4 bg-white rounded-lg shadow">
//             <p className="text-sm text-gray-600">Chờ xác nhận</p>
//             <p className="text-2xl font-bold text-yellow-600">23</p>
//           </div>
//           <div className="p-4 bg-white rounded-lg shadow">
//             <p className="text-sm text-gray-600">Đang giao</p>
//             <p className="text-2xl font-bold text-purple-600">15</p>
//           </div>
//           <div className="p-4 bg-white rounded-lg shadow">
//             <p className="text-sm text-gray-600">Đã giao</p>
//             <p className="text-2xl font-bold text-green-600">98</p>
//           </div>
//           <div className="p-4 bg-white rounded-lg shadow">
//             <p className="text-sm text-gray-600">Đã hủy</p>
//             <p className="text-2xl font-bold text-red-600">20</p>
//           </div>
//         </div>

//         {/* Filter Bar */}
//         <div className="p-4 mb-6 bg-white rounded-lg shadow">
//           <div className="flex flex-wrap items-center gap-4">
//             <div className="flex-1 min-w-[200px]">
//               <div className="relative">
//                 <FontAwesomeIcon
//                   icon={faSearch}
//                   className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Tìm kiếm theo mã đơn, khách hàng, SĐT..."
//                   className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               <FontAwesomeIcon icon={faFilter} className="text-gray-500" />
//               <select
//                 className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                 // value={selectedStatus}
//                 onChange={(e) => setSelectedStatus(e.target.value)}
//               >
//                 <option value="all">Tất cả trạng thái</option>
//                 <option value="pending">Chờ xác nhận</option>
//                 <option value="confirmed">Đã xác nhận</option>
//                 <option value="shipping">Đang giao</option>
//                 <option value="delivered">Đã giao</option>
//                 <option value="cancelled">Đã hủy</option>
//               </select>
//             </div>

//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-600">Từ:</span>
//               <input
//                 type="date"
//                 className="px-3 py-2 border border-gray-300 rounded-lg"
//               />
//             </div>

//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-600">Đến:</span>
//               <input
//                 type="date"
//                 className="px-3 py-2 border border-gray-300 rounded-lg"
//               />
//             </div>
//           </div>
//         </div>


// // | Status    | Ý nghĩa      |
// // | --------- | ------------ |
// // | pending   | chờ xác nhận |
// // | confirmed | đã xác nhận  |
// // | shipping  | đang giao    |
// // | completed | hoàn thành   |
// // | cancelled | huỷ          |

