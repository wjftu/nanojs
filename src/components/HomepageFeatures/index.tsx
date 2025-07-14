import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  // Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  url?: string;
  imgPath: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'JavaScript Tools',
    imgPath: '/img/tool.jpeg',
    // Svg: require('@site/static/img/tool.jpeg').default,
    url: '/tool',
    description: (
      <>
        Provide fast, simple, and browser-based toolbox. Lightweight and no-install-needed. 
        All tools run entirely in your browser, no data collection, no backend server. Built for privacy.
      </>
    ),
  },
  {
    title: 'Data Structure and Algorithm',
    imgPath: '/img/algorithms.jpeg',
    url: '/algorithm',
    description: (
      <>
        Data Structure and Algorithm in modern JavaScript.
        Clean and annotated algorithms problem solutions.
      </>
    ),
  },
  {
    title: 'Learn JavaScript',
    imgPath: '/img/js.jpeg',
    url: '/javascript',
    description: (
      <>
        Learn JavaScript from scratch.
        Understand the core concepts of JavaScript.
      </>
    ),
  },
];

function Feature({ title, description, url, imgPath }: FeatureItem) {
  return (
    <div className="col col--4 text--center">
      <div>
        <img src={imgPath} alt={title} width="200" />
      </div>
      <div className="padding-horiz--md">
        <h3>{url ? <a href={url}>{title}</a> : title}</h3>
        <p>{description}</p>
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
