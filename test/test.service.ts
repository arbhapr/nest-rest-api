import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/common/prisma.service';
import * as bcrypt from 'bcrypt';
import { Address, Contact, User } from '@prisma/client';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async deleteUser() {
    await this.prismaService.user.deleteMany({
      where: {
        username: 'test',
      },
    });
  }

  async getUser(): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        username: 'test',
      },
    });
  }

  async createUser() {
    await this.prismaService.user.create({
      data: {
        username: 'test',
        password: await bcrypt.hash('test', 10),
        name: 'test',
        token: 'test',
      },
    });
  }

  async deleteContact() {
    await this.prismaService.contact.deleteMany({
      where: {
        user: {
          username: 'test',
        },
      },
    });
  }

  async getContact(): Promise<Contact> {
    return await this.prismaService.contact.findFirst({
      where: {
        username: 'test',
      },
    });
  }

  async createContact() {
    await this.prismaService.contact.create({
      data: {
        first_name: 'test',
        last_name: 'contact',
        email: 'test@test.com',
        phone: '081333',
        user: {
          connect: {
            username: 'test',
          },
        },
      },
    });
  }

  async deleteAddress() {
    await this.prismaService.address.deleteMany({
      where: {
        contact: {
          username: 'test',
        },
      },
    });
  }

  async createAddress() {
    const contact = await this.getContact();
    await this.prismaService.address.create({
      data: {
        street: 'jalan test',
        city: 'kota test',
        province: 'provinsi test',
        country: 'test',
        postal_code: '12345',
        contact_id: contact.id,
      },
    });
  }

  async getAddress(): Promise<Address> {
    const contact = await this.getContact();
    return await this.prismaService.address.findFirst({
      where: {
        contact_id: contact.id,
      },
    });
  }
}
