import UpdateInput from '../components/inputs/UpdateInput'

const Profile = () => {
  return (
    <div>
      <div className="flex justify-center">Profile</div>
      <div className="flex flex-col">
        <div className="ml-2">Update Profile</div>
        <div className="mx-8 my-2">
          <UpdateInput label="Name" />
        </div>
      </div>
    </div>
  )
}

export default Profile
