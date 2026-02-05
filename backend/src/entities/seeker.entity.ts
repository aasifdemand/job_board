import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('job_seeker_profiles')
export class JobSeekerProfile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

    @Column({ nullable: true })
    headline: string; // e.g. "Frontend Developer | Angular | React"

    @Column({ type: 'text', nullable: true })
    summary: string;

    @Column({ nullable: true })
    location: string;

    @Column({ nullable: true })
    experienceLevel: string; // Junior / Mid / Senior

    @Column({ type: 'simple-array', nullable: true })
    skills: string[]; // ['Angular', 'Node', 'Postgres']

    @Column({ nullable: true })
    resumeUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
