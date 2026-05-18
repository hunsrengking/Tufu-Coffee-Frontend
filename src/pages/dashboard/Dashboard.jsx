import React from 'react'

const Dashboard = () => {
  const stats = [
    { label: 'Unique Visitors', value: '24.7K', change: '+20%', trend: 'up' },
    { label: 'Total Pageviews', value: '55.9K', change: '+4%', trend: 'up' },
    { label: 'Bounce Rate', value: '54%', change: '-1.59%', trend: 'down' },
    { label: 'Visit Duration', value: '2m 56s', change: '+7%', trend: 'up' },
  ]

  const recentOrders = [
    { id: '#ORD-7812', customer: 'Alice Johnson', product: 'Cappuccino', amount: '$4.50', status: 'Delivered', date: '2 mins ago' },
    { id: '#ORD-7813', customer: 'Bob Smith', product: 'Latte', amount: '$5.00', status: 'Processing', date: '15 mins ago' },
    { id: '#ORD-7814', customer: 'Carol White', product: 'Espresso', amount: '$3.50', status: 'Cancelled', date: '1 hour ago' },
    { id: '#ORD-7815', customer: 'David Brown', product: 'Mocha', amount: '$5.50', status: 'Delivered', date: '3 hours ago' },
  ]

  const statusStyles = {
    Delivered: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800',
    Processing: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800',
    Cancelled: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800',
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="text-sm sm:text-base text-slate-500 font-medium tracking-tight">Welcome back! Here's your coffee shop performance.</p>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700">
          <i className="fa-solid fa-file-lines text-sm"></i>
          Generate Report
        </button>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 shadow-sm rounded-xl p-4 sm:p-6 flex flex-col justify-between cursor-pointer"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="mb-3 sm:mb-4">
              <span className="text-[11px] sm:text-[13px] font-semibold text-slate-500">{stat.label}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1">
              <h3 className="text-2xl sm:text-[28px] font-bold text-slate-800 leading-none">{stat.value}</h3>
              <div className="flex items-center gap-1 sm:gap-2 sm:pb-0.5">
                <span className={`px-1.5 sm:px-2 py-0.5 rounded text-[10px] font-bold ${
                  stat.trend === 'up' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'
                }`}>
                  {stat.change}
                </span>
                <span className="hidden sm:block text-[11px] font-medium text-slate-400">Vs last month</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Analytics Chart Full Width */}
      <section className="bg-white border border-slate-200 shadow-sm rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-10 gap-3 sm:gap-4">
          <div>
            <h2 className="text-base sm:text-[18px] font-bold text-slate-800">Analytics</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Visitor analytics of last 30 days</p>
          </div>

          <div className="flex items-center rounded-md bg-slate-50 p-1 border border-slate-100 self-start sm:self-auto">
            <button className="px-3 sm:px-4 py-1.5 text-[12px] sm:text-[13px] font-medium bg-white text-slate-800 rounded shadow-sm">Monthly</button>
            <button className="px-3 sm:px-4 py-1.5 text-[12px] sm:text-[13px] font-medium text-slate-500 hover:text-slate-800">Quarterly</button>
            <button className="px-3 sm:px-4 py-1.5 text-[12px] sm:text-[13px] font-medium text-slate-500 hover:text-slate-800">Annually</button>
          </div>
        </div>

        {/* Bar Chart Area — horizontally scrollable on mobile */}
        <div className="relative w-full overflow-x-auto">
          <div className="relative h-64 sm:h-80 min-w-[480px]">
            {/* Horizontal Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between text-[11px] text-slate-400 pb-8">
              <div className="flex w-full items-center border-b border-slate-100 pb-2"><span>400</span></div>
              <div className="flex w-full items-center border-b border-slate-100 pb-2"><span>300</span></div>
              <div className="flex w-full items-center border-b border-slate-100 pb-2"><span>200</span></div>
              <div className="flex w-full items-center border-b border-slate-100 pb-2"><span>100</span></div>
              <div className="flex w-full items-center pb-2"><span>0</span></div>
            </div>

            {/* Bars */}
            <div className="absolute inset-0 pl-10 pb-8 pt-4 flex items-end justify-between gap-1 sm:gap-2">
              {[160, 380, 195, 290, 180, 190, 285, 100, 210, 390, 275, 105, 115, 205, 265, 185, 305, 105, 85, 370, 105, 215, 285, 160, 280, 100, 105, 285, 370, 305].map((h, i) => (
                <div key={i} className="relative flex flex-col items-center flex-1 h-full justify-end group">
                  <div
                    style={{ height: `${(h / 400) * 100}%` }}
                    className="w-full max-w-[12px] bg-blue-500 rounded-t-sm group-hover:bg-blue-600 transition-colors cursor-pointer"
                  ></div>
                  <span className="absolute -bottom-6 text-[10px] text-slate-400 font-medium">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Orders Table — card layout on mobile */}
      <section className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-slate-100">
          <h2 className="text-base sm:text-[18px] font-bold text-slate-800">Recent Orders</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Latest transactions from your coffee shop</p>
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono font-semibold text-slate-700">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-900">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{order.product}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{order.amount}</td>
                  <td className="px-6 py-4"><span className={statusStyles[order.status]}>{order.status}</span></td>
                  <td className="px-6 py-4 text-sm text-slate-400">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className="sm:hidden divide-y divide-slate-100">
          {recentOrders.map((order) => (
            <div key={order.id} className="px-4 py-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-slate-700">{order.id}</span>
                <span className={statusStyles[order.status]}>{order.status}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-900">{order.customer}</span>
                <span className="text-sm font-bold text-slate-900">{order.amount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{order.product}</span>
                <span className="text-xs text-slate-400">{order.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
