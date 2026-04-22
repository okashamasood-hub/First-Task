import Sidebar from "../components/sidebar";


const Dashboard = () => {
  return (
    <div className="flex">

   
      <Sidebar />

    
      <div className="flex-1 p-8 bg-gray-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">Users</h2>
            <p className="text-2xl font-bold">1,245</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">Revenue</h2>
            <p className="text-2xl font-bold">$8,430</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">Orders</h2>
            <p className="text-2xl font-bold">320</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;