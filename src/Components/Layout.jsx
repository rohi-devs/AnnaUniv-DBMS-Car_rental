import React, { useState } from 'react';
import ViewBranch from "./ViewBranch";
import AddCustomer from "./AddCustomer";
import AddEmployee from "./AddEmployee";
import AddCar from "./AddCar";
import BookCar from "./BookCar";
import Summary from "./Summary";
import Dashboard from "./Dashboard";
import Histroy from "./Histroy";
const SideNavbar = ({ isOpen, toggleNavbar, changeComponent }) => {
  return (
      <div className={`bg-orange-500 text-white w-56 ${isOpen ? 'block' : 'hidden'} sm:block`}>
        <div className="p-4 border-b border-orange-700">
          <span className="text-lg font-semibold">Car Rental Management System</span>
          <button onClick={toggleNavbar} className="sm:hidden float-right focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
            <ul>
                <li className="mb-2">
                    <button onClick={() => changeComponent('Link1Component')}
                            className="block text-white hover:text-orange-100 focus:outline-none">Dashboard
                    </button>
                </li>
                <li className="mb-2">
                    <button onClick={() => changeComponent('Link3Component')}
                            className="block text-white hover:text-orange-100  focus:outline-none">View the List of
                        Branches
                    </button>
                </li>
                <li className="mb-2">
                    <button onClick={() => changeComponent('Link2Component')}
                            className="block text-white hover:text-orange-100  focus:outline-none">Add User/Customer
                    </button>
                </li>
                <li className="mb-2">
                    <button onClick={() => changeComponent('Link4Component')}
                            className="block text-white hover:text-orange-100  focus:outline-none">Add Employee
                    </button>
                </li>
                <li className="mb-2">
                    <button onClick={() => changeComponent('Link5Component')}
                            className="block text-white hover:text-orange-100  focus:outline-none">Add Car
                    </button>
                </li>
                <li className="mb-2">
                    <button onClick={() => changeComponent('Link6Component')}
                            className="block text-white hover:text-orange-100  focus:outline-none">Book Car
                    </button>
                </li>
                <li className="mb-2">
                    <button onClick={() => changeComponent('Link7Component')}
                            className="block text-white hover:text-orange-100  focus:outline-none">Customer Summary
                    </button>
                </li>
                <li className="mb-2">
                    <button onClick={() => changeComponent('Link8Component')}
                            className="block text-white hover:text-orange-100  focus:outline-none">Histroy
                    </button>
                </li>
            </ul>
        </div>
      </div>
  );
};

const Link1Component = () => (
    <div className="p-4">
        <h1>Dashboard</h1>
        <Dashboard/>
    </div>
);

const Link4Component = () => (
    <div className={'p-4'}>
        <AddEmployee/>
    </div>
)

const Link2Component = () => (
    <div className="p-4">
      <AddCustomer />
    </div>
);

const Link3Component = () => (
    <div className="p-4">
      <ViewBranch />
    </div>
);

const Link5Component = () => (
    <div className="p-4">
      <AddCar />
    </div>
);

const Link6Component = () => (
    <div className="p-4" >
        <BookCar />
    </div>
);

const Link7Component = () => (
    <div className='p-4' >
        <Summary />
    </div>
);

const Link8Component = () => {
    return (
        <div className='p-4' >
            <Histroy />
        </div>
    )
}

const Layout = () => {
  const [currentComponent, setCurrentComponent] = useState('Link1Component');
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const changeComponent = (componentName) => {
    setCurrentComponent(componentName);
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case 'Link1Component':
        return <Link1Component />;
      case 'Link2Component':
        return <Link2Component />;
      case 'Link3Component':
        return <Link3Component />;
      case 'Link4Component':
        return <Link4Component />;
        case 'Link5Component':
            return <Link5Component />
        case 'Link6Component':
            return <Link6Component />
        case 'Link7Component':
            return <Link7Component />
        case 'Link8Component':
            return <Link8Component />
      default:
        return null;
    }
  };

  return (
      <div className="flex h-screen bg-orange-50">
        <SideNavbar isOpen={isOpen} toggleNavbar={toggleNavbar} changeComponent={changeComponent} />
        <div className="flex-1">

          {renderComponent()}
        </div>
      </div>
  );
};

export default Layout;
