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
      title: 'Shape the user experience with reviewable component proposals.',
      description:
        'Explore visual directions, refine design tokens, and review proposed responsive component diffs before approving.',
      points: [
        'Review proposed UI diffs before applying to components',
        'Keep design tokens synchronized with CSS variables',
        'Inspect proposed layouts across mobile, tablet, and desktop',
        'Scaffold atomic components with developer oversight',
      ],
    },
    backend: {
      kicker: 'FOR BACKEND ARCHITECTS & ENGINEERS',
      title: 'Review API designs, schema migrations, and contracts before commit.',
      description:
        'Let AI draft typed OpenAPI specs, SQL migrations, and endpoints while you maintain complete authority over system architecture and database safety.',
      points: [
        'Inspect drafted REST & GraphQL endpoints before committing',
        'Review database migrations with safe rollback plans',
        'Audit security rules, JWT claims, and permission boundaries',
        'Maintain complete developer control over database schemas',
      ],
    },
    fullstack: {
      kicker: 'FOR FULL STACK BUILDERS',
      title: 'Keep the whole system in view with approval at every boundary.',
      description:
        'Give AI full repository context to propose end-to-end changes while you review how frontend components connect with backend endpoints before applying edits.',
      points: [
        'Trace proposed edits across connected frontend and backend files',
        'Ensure API contracts and client hooks stay aligned',
        'Review multi-file diffs in a unified preview',
        'Developer sign-off required for all cross-stack updates',
      ],
    },
    teams: {
      kicker: 'FOR ENGINEERING & PRODUCT TEAMS',
      title: 'Move together with transparent plans and human sign-offs.',
      description:
        'Make execution plans, branch diffs, and reviews visible so engineers and leads can review, comment, and approve changes before anything touches production.',
      points: [
        'Review agent proposals collaboratively with your team',
        'Isolate proposed changes to dedicated Git branches',
        'Enforce human-in-the-loop approvals before merging',
        'Shared mental model from feature brief to approved code',
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

