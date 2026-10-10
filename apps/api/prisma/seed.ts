import { PrismaClient, Role, UserStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const nodeEnv = process.env.NODE_ENV ?? 'development';
  if (nodeEnv === 'production') {
    throw new Error(
      'CRITICAL SAFETY ERROR: Database seeding is strictly disabled in production environments!',
    );
  }

  console.log('>>> [Prisma Seed] Starting development database seeding...');

  // 1. Seed Core System Settings (Idempotent upsert)
  const settings = [
    {
      key: 'platform.meta',
      value: {
        name: 'AIC-ADT Baramati Foundation',
        tagline: 'Catalyzing Agri-Tech & Rural Innovation',
        supportEmail: 'incubation@aic-adt.org',
        locale: 'en',
      },
      description: 'Institutional metadata and public contact coordinates',
      isPublic: true,
    },
    {
      key: 'intake.current_cycle',
      value: {
        cohort: '2026-Batch-1',
        isOpen: true,
        startDate: '2026-01-01T00:00:00.000Z',
        endDate: '2026-12-31T23:59:59.000Z',
      },
      description: 'Active incubation application cycle parameters',
      isPublic: true,
    },
    {
      key: 'security.rate_limits',
      value: {
        publicRequestsPerMinute: 60,
        authenticatedRequestsPerMinute: 300,
      },
      description: 'Internal security and rate limiting thresholds',
      isPublic: false,
    },
  ];

  for (const setting of settings) {
    await prisma.systemSetting.upsert({
      where: { key: setting.key },
      update: {
        value: setting.value,
        description: setting.description,
        isPublic: setting.isPublic,
      },
      create: setting,
    });
  }
  console.log(`>>> [Prisma Seed] Seeded ${settings.length} system settings.`);

  // 2. Seed Development Administrative & Applicant Accounts (Idempotent upsert)
  // Dev passwords are for local development testing only
  const devUsers = [
    {
      email: 'admin.dev@aic-adt.org',
      fullName: 'Institutional Administrator',
      phone: '+919876543210',
      passwordHash:
        '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890dummyhashforlocaldev',
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
    },
    {
      email: 'manager.dev@aic-adt.org',
      fullName: 'Program Manager Baramati',
      phone: '+919876543211',
      passwordHash:
        '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890dummyhashforlocaldev',
      role: Role.PROGRAM_MANAGER,
      status: UserStatus.ACTIVE,
    },
    {
      email: 'applicant.dev@agritech.example',
      fullName: 'Ramesh Jadhav',
      phone: '+919876543212',
      passwordHash:
        '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890dummyhashforlocaldev',
      role: Role.PUBLIC_APPLICANT,
      status: UserStatus.ACTIVE,
    },
  ];

  for (const user of devUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        fullName: user.fullName,
        phone: user.phone,
        role: user.role,
        status: user.status,
      },
      create: user,
    });
  }
  console.log(`>>> [Prisma Seed] Seeded ${devUsers.length} development users.`);

  // 3. Seed Initial System Audit Record
  const adminUser = await prisma.user.findUnique({
    where: { email: 'admin.dev@aic-adt.org' },
  });

  if (adminUser) {
    await prisma.auditLog.create({
      data: {
        userId: adminUser.id,
        action: 'SYSTEM_BOOTSTRAP_SEED',
        resource: 'system_settings',
        resourceId: 'platform.meta',
        ipAddress: '127.0.0.1',
        userAgent: 'PrismaSeed/1.0.0 (Local Development)',
        metadata: {
          seededBy: 'dev-seed-script',
          environment: nodeEnv,
        },
      },
    });
    console.log('>>> [Prisma Seed] Initial bootstrap audit log recorded.');
  }

  console.log('>>> [Prisma Seed] Database development seeding complete.');
}

main()
  .catch((e) => {
    console.error('>>> [Prisma Seed] Error executing seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
