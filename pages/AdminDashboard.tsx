import React from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp, Package } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { name: 'Total Revenue', value: '$45,231.89', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Total Orders', value: '356', icon: ShoppingBag, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { name: 'Active Users', value: '2,103', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Growth', value: '+12.5%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="mt-4 md:mt-0">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                System Operational
            </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${item.bg}`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{item.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Mockup */}
      <div className="bg-white shadow rounded-lg border border-gray-100">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
        </div>
        <ul className="divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map((i) => (
                <li key={i} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500">
                                    <Package className="h-6 w-6 text-white" />
                                </span>
                            </div>
                            <div className="ml-4">
                                <div className="text-sm font-medium text-indigo-600">Order #{1000 + i}</div>
                                <div className="text-sm text-gray-500">user{i}@example.com</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                             <div className="text-sm font-medium text-gray-900">$ {Math.floor(Math.random() * 200) + 50}.00</div>
                             <div className="text-sm text-green-600">Completed</div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
         <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 rounded-b-lg">
             <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View all orders &rarr;</a>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;