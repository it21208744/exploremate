import { Menu, Button } from 'antd'
import { useState } from 'react'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { AiTwotoneSchedule } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import { MdLocalHotel } from 'react-icons/md'
import { FcPlanner } from 'react-icons/fc'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const NewNav = () => {
  const navigate = useNavigate()
  const items = [
    {
      key: '1',
      icon: <RiMoneyDollarCircleFill />,
      label: 'Planner',
      onClick: () => navigate('/travelerDashBoard'),
    },
    {
      key: '2',
      icon: <AiTwotoneSchedule />,
      label: 'Plan on your budget',
      onClick: () => navigate('/travelerDashBoard/planOnYourBudget'),
    },
    {
      key: '3',
      icon: <FaUserAlt />,
      label: 'Services',
      onClick: () => navigate('/travelerDashBoard/services'),
    },
    {
      key: '4',
      icon: <MdLocalHotel />,
      label: 'Profile',
      onClick: () => navigate('/travelerDashBoard/profile'),
    },
    {
      key: '5',
      icon: <FcPlanner />,
      label: 'Plans',
      onClick: () => navigate('/travelerDashBoard/guide'),
    },
  ]

  const [collapsed, setCollapsed] = useState(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  return (
    <div>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        style={{ width: '15vw', position: 'fixed' }}
      />
    </div>
  )
}
export default NewNav
