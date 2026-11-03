import React, { useState } from 'react';
import { BuilderRole } from '../../types/orbit';

interface BuilderRolesSectionProps {
  onRoleChange?: (role: BuilderRole) => void;
}

export const BuilderRolesSection: React.FC<BuilderRolesSectionProps> = ({ onRoleChange }) => {
  const [activeRole, setActiveRole] = useState<BuilderRole>('frontend');

  const rolesContent: Record<
    BuilderRole,
    {
      kicker: string;
      title: string;
      description: string;
      points: string[];
    }
  > = {
    frontend: {
      kicker: 'FOR FRONTEND DEVELOPERS',
      title: 'Shape the user experience while agents handle repetitive markup.',
      description:
        'Explore visual directions, refine design tokens, and review responsive components right beside your code with real-time browser preview synchronization.',
      points: [
        'Iterate on real browser previews with live HMR',
        'Keep design intent synchronized with CSS variables',
        'Review responsive viewports (Mobile, Tablet, Desktop) as changes land',
        'Atomic component scaffolding for React, Vue, and Tailwind',
      ],
    },
    backend: {
      kicker: 'FOR BACKEND ARCHITECTS & ENGINEERS',
      title: 'Orchestrate robust APIs, database migrations, and microservice contracts.',
      description:
        'Let agents generate typed OpenAPI specs, optimize SQL queries, and implement authentication while you supervise system performance, database integrity, and data safety.',
      points: [
        'Auto-generate REST & GraphQL endpoints with type-safe schema contracts',
        'Manage SQLite (orbit.db), Postgres, and Cloud SQL with rollbacks',
        'Enforce RBAC security, JWT claims, and rate-limiting middleware',
        'Automated database audit logs and schema health checks',
      ],
    },
    fullstack: {
      kicker: 'FOR FULL STACK BUILDERS',
      title: 'Keep the whole system in view from interface to database.',
      description:
        'Give agents context across your entire project so they can trace a feature change seamlessly from the frontend UI through to the Express API and SQLite data layer.',
      points: [
        'Trace edits across connected frontend and backend files',
        'Keep API contracts and React client hooks synchronized',
        'Inspect SQLite queries and real-time network payloads in one window',
        'Export unified Docker containers and production cloud artifacts',
      ],
    },
    teams: {
      kicker: 'FOR ENGINEERING & PRODUCT TEAMS',
      title: 'Move together from product brief to verified release.',
      description:
        'Make execution plans, branch diffs, and visual reviews transparent so engineers, designers, and managers collaborate with a shared mental model.',
      points: [
        'Centralize project briefs and PR acceptance criteria',
        'Isolate agent work to dedicated Git branches before merging',
        'Automated visual regression tests and reviewer sign-offs',
        'Live multi-role activity feeds and collaborative task queues',
      ],
    },
  };

  const handleSelectRole = (role: BuilderRole) => {
    setActiveRole(role);
    onRoleChange?.(role);
  };

  const current = rolesContent[activeRole];

  return (
    <section className="builders-section shell section-space" id="for-builders" aria-labelledby="builders-title">
      <div className="builders-heading">
        <div>
          <p className="eyebrow">MADE FOR HOW YOU BUILD</p>
          <h2 id="builders-title">
            Your craft stays
            <br />
            at the center.
          </h2>
        </div>
        <p>
          Whether you are crafting an interface, architecting scalable APIs, shipping a complete full-stack product, or coordinating work across an engineering team, Orbit adapts to your flow.
        </p>
      </div>

      {/* Role Tabs */}
      <div className="builder-tabs" role="tablist" aria-label="Ways to work with Orbit">
        {(['frontend', 'backend', 'fullstack', 'teams'] as BuilderRole[]).map((role) => (
          <button
            key={role}
            type="button"
            className={`builder-tab ${activeRole === role ? 'is-active' : ''}`}
            id={`tab-${role}`}
            role="tab"
            aria-selected={activeRole === role}
            aria-controls="builder-panel"
            onClick={() => handleSelectRole(role)}
          >
            {role === 'fullstack' ? 'Full stack' : role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>

      {/* Role Panel */}
      <div
        className="builder-panel"
        id="builder-panel"
        role="tabpanel"
        aria-labelledby={`tab-${activeRole}`}
        tabIndex={0}
      >
        <div className="builder-panel-copy">
          <span className="panel-kicker">{current.kicker}</span>
          <h3>{current.title}</h3>
          <p>{current.description}</p>
          <ul>
            {current.points.map((point, idx) => (
              <li key={idx}>
                <span>✓</span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual Card / Diagram */}
        <div className="builder-visual" aria-label={`${activeRole} architecture visual representation`}>
          <div className="builder-orbit orbit-a" />
          <div className="builder-orbit orbit-b" />

          {/* Isometric Cube Visual */}
          <div className="builder-cube">
            <div className="cube-face cube-front" />
            <div className="cube-face cube-side" />
            <div className="cube-face cube-top" />
          </div>

          <span className="builder-star star-a">✳</span>
          <span className="builder-star star-b">✦</span>

          <span className="builder-caption">
            {activeRole.toUpperCase()} ARCHITECTURE MAPPING
          </span>
        </div>
      </div>
    </section>
  );
};

export default BuilderRolesSection;
