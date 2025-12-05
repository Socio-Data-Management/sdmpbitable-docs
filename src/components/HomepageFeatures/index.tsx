import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
} & (
  | { type: 'svg'; Svg: React.ComponentType<React.ComponentProps<'svg'>> }
  | { type: 'image'; image: string }
);

const FeatureList: FeatureItem[] = [
  {
    type: 'image',
    title: 'Easy to Use',
    image: require('@site/static/img/Hierarchical_data.png').default,
    description: (
      <>
        Our Cross Table Tool makes it easy to create and analyze cross-tabulation tables in Power BI.
        Show significance testing, base, apply thresholds, and customize formatting with just a few clicks.
      </>
    ),
  },
  {
    type: 'image',
    title: 'Focus on What Matters',
    image: require('@site/static/img/focus.png').default,
    description: (
      <>
        With our tool, don't waste time wrangling data or building complex formulas. Instead, focus on interpreting results and making data-driven decisions.
      </>
    ),
  },
  {
    type: 'svg',
    title: 'Powered by Power BI',
    Svg: require('@site/static/img/power-bi-logo.svg').default,
    description: (
      <>
        Extend your Power BI reports and DashBoard with custom visuals that can create cross tables with significance testing, thresholds, and more.
      </>
    ),
  },
];

function Feature(feature: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {feature.type === 'svg' ? (
          <feature.Svg className={styles.featureSvg} role="img" />
        ) : (
          <img src={feature.image} alt={feature.title} className={styles.featureSvg} />
        )}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{feature.title}</Heading>
        <p>{feature.description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
