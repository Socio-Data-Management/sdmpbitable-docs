import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
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
        Our tools make it easy to create and analyze cross-tabulation tables in Power BI — as numbers or as small in-cell charts.
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
        Don't waste time wrangling data or building complex formulas. Instead, focus on interpreting results and making data-driven decisions.
      </>
    ),
  },
  {
    type: 'svg',
    title: 'Powered by Power BI',
    Svg: require('@site/static/img/power-bi-logo.svg').default,
    description: (
      <>
        Extend your Power BI reports and dashboards with custom visuals that create cross tables with significance testing, thresholds, and more.
      </>
    ),
  },
];

type VisualCard = {
  title: string;
  description: ReactNode;
  to: string;
  linkLabel: string;
};

const VisualList: VisualCard[] = [
  {
    title: 'CrossTable',
    description: (
      <>
        The full crosstab: numeric cells, <strong>Ranking</strong> badges &amp; gradients, <strong>Cell Rules</strong> conditional decoration, <strong>Tile Mode</strong>.
      </>
    ),
    to: '/docs/intro',
    linkLabel: 'Explore CrossTable →',
  },
  {
    title: 'CrossTable InCell Charts',
    description: (
      <>
        The same hierarchical table, with <strong>Data Bar</strong> and <strong>Data Line</strong> mini-charts — and <strong>Gap Mode</strong> comparison columns — instead of plain numbers.
      </>
    ),
    to: '/docs/crosstable-charts/overview',
    linkLabel: 'Explore InCell Charts →',
  },
];

function VisualsSection(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center margin-bottom--lg">
          <Heading as="h2">Two visuals, one family</Heading>
          <p>Same data roles, same percentage/mean engine, same significance tests — pick the visual that fits how a table should read.</p>
        </div>
        <div className="row">
          {VisualList.map((visual) => (
            <div key={visual.title} className={clsx('col col--6')}>
              <div className="card padding--lg">
                <Heading as="h3">{visual.title}</Heading>
                <p>{visual.description}</p>
                <Link to={visual.to}>{visual.linkLabel}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
    <>
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
          <div className="text--center margin-top--lg">
            <Link to="https://youtu.be/ZAc73A6DHT4">View Video Presentation</Link>
          </div>
        </div>
      </section>
      <VisualsSection />
    </>
  );
}
