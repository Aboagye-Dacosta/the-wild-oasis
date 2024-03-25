import supabase, { supabaseUrl } from "../services/supabase";

export async function login({ email, password }) {
  const { data: { user } = {}, error } = await supabase.auth.signInWithPassword(
    {
      email,
      password,
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return user;
}
export async function loadRoles() {
  const { data, error } = await supabase.from("roles").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function loadRoutes() {
  const { data, error } = await supabase.from("routes").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data: { user } = {}, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return user;
}
export async function getUsers() {
  const {
    data: { users },
    error,
  } = await supabase.auth.admin.listUsers();

  if (error) {
    throw new Error(error.message);
  }

  return users;
}

export async function logout() {
  const { data, error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function signup({ email, password, fullName, role }) {
  const { data: { user } = {}, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
        role,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return user;
}

export async function updateUser({ fullName, password, avatar, role }) {
  //check the update data
  let updateData = {};
  if (fullName) updateData = { data: { fullName, role } };
  if (password) updateData = { password };

  //update the data
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  //if there's is and avatar then upload the avatar
  if (!avatar) return data;

  const fileName = `avatar-${data.id}-${Math.random()}-${avatar.name}`;
  const { error: error2 } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (error2) throw new Error(error2.message);

  const { data: updatedData, error: error3 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error3) throw new Error(error3.message);

  //update the avatar data
  return updatedData;
}
