'use server';

import connectDB from '@/lib/db';
import { User, type IAddress } from '@/models/User';
import { 
  RegisterInput, 
  AddressInput, 
  registerSchema, 
  addressSchema 
} from '@/lib/validation';
import { getAuthSession, requireAuth } from '@/lib/session';
import { revalidatePath } from 'next/cache';

export async function registerUser(userData: RegisterInput) {
  try {
    await connectDB();
    const validatedData = registerSchema.parse(userData);

    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) throw new Error('User with this email already exists');

    const user = new User({
      email: validatedData.email,
      password: validatedData.password,
      name: validatedData.name,
    });

    await user.save();

    return { 
      success: true, 
      message: 'User registered successfully',
      userId: user._id.toString(),
    };
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to register user');
  }
}

export async function addUserAddress(addressData: AddressInput) {
  try {
    await connectDB();

    const session = await getAuthSession();
    const authSession = requireAuth(session);
    const userId = authSession.user.id; // ✅ Now fully typed

    const validatedAddress = addressSchema.parse(addressData);

    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    if (validatedAddress.isDefault) {
      user.addresses.forEach((address: IAddress) => {
        if (address.type === validatedAddress.type) {
          address.isDefault = false;
        }
      });
    }

    user.addresses.push(validatedAddress as IAddress);
    await user.save();

    revalidatePath('/profile');

    return { success: true, message: 'Address added successfully' };
  } catch (error) {
    console.error('Error adding address:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to add address');
  }
}

export async function updateUserAddress(addressId: string, addressData: AddressInput) {
  try {
    await connectDB();

    const session = await getAuthSession();
    const authSession = requireAuth(session);
    const userId = authSession.user.id; // ✅ Now fully typed

    const validatedAddress = addressSchema.parse(addressData);

    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const addressIndex = user.addresses.findIndex(
      (addr: IAddress) => addr._id?.toString() === addressId
    );

    if (addressIndex === -1) throw new Error('Address not found');

    if (validatedAddress.isDefault) {
      user.addresses.forEach((address: IAddress, index: number) => {
        if (address.type === validatedAddress.type && index !== addressIndex) {
          address.isDefault = false;
        }
      });
    }

    user.addresses[addressIndex] = { ...user.addresses[addressIndex], ...validatedAddress } as IAddress;
    await user.save();

    revalidatePath('/profile');

    return { success: true, message: 'Address updated successfully' };
  } catch (error) {
    console.error('Error updating address:', error);
    throw new Error('Failed to update address');
  }
}

export async function deleteUserAddress(addressId: string) {
  try {
    await connectDB();

    const session = await getAuthSession();
    const authSession = requireAuth(session);
    const userId = authSession.user.id; // ✅ Now fully typed

    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    user.addresses = user.addresses.filter(
      (addr: IAddress) => addr._id?.toString() !== addressId
    );

    await user.save();

    revalidatePath('/profile');

    return { success: true, message: 'Address deleted successfully' };
  } catch (error) {
    console.error('Error deleting address:', error);
    throw new Error('Failed to delete address');
  }
}

export async function getUserProfile() {
  try {
    await connectDB();

    const session = await getAuthSession();
    const authSession = requireAuth(session);
    const userId = authSession.user.id; // ✅ Now fully typed

    const user = await User.findById(userId).select('-password').lean();
    if (!user) throw new Error('User not found');

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw new Error('Failed to fetch user profile');
  }
}