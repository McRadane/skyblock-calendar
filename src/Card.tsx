export interface CardProps {
  date: string;
  description: string;
  image: string;
  onClick: () => void;
  selected: boolean;
  title: string;
}
export const Card = (props: CardProps) => {
  const { date, description, image, onClick, selected, title } = props;

  const className = selected ? 'card selected-card' : 'card';

  return (
    <div class="cell">
      <div class={className}>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img alt={`${title} event`} src={image} />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{title}</p>
            </div>
          </div>

          <div class="content">
            {description}
            <br />
            {date}
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" onclick={onClick}>
            {selected ? 'Deselect' : 'Select'}
          </a>
        </footer>
      </div>
    </div>
  );
};
