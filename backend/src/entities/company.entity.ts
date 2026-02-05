import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Job } from './job.entity';
import { User } from './user.entity';

@Entity('companies')
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    website: string;

    @Column({ nullable: true })
    location: string;

    @Column({ nullable: true, type: 'text' })
    description: string;

    @OneToMany(() => Job, (job) => job.company)
    jobs: Job[];

    @OneToOne(() => User, (user) => user.company, { onDelete: 'CASCADE' })
    @JoinColumn() // 👈 THIS IS THE KEY
    user: User;

    @CreateDateColumn()
    createdAt: Date;
}
