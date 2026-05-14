async function GETUSER({ user }) {
  return (
    <div className="p-4 border rounded shadow-sm">
      <h2 className="text-xl font-bold">اطلاعات کاربر:</h2>
      <p>ایمیل: {user.phone}</p>
      <p>نام کاربری: {user.id}</p>
      <p>نقش: {user.role}</p>
    </div>
  );
}

export default GETUSER;
